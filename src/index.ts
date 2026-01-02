// src/index.ts - Cloudflare Worker 入口文件
// 注意：免费计划每月提供 10 万次读取和 1 万次写入/删除操作
// 优化建议：使用客户端缓存减少不必要的请求

import { KVAPI, OrderData, UserPreference, ApplicationData, ContentData, StatsData, BroadcastData } from './kv-api';

interface Env {
  MODEL_PI: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const kvAPI = new KVAPI(env);

    // 处理不同路径的请求
    if (path === '/api/kv/get') {
      const key = url.searchParams.get('key');
      if (!key) {
        return new Response(JSON.stringify({ error: 'Key is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      try {
        // 注意：每次 get 操作会消耗读取配额（免费计划每月 10 万次）
        const value = await env.MODEL_PI.get(key);
        return new Response(JSON.stringify({ key, value }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } 
    else if (path === '/api/kv/set') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }
      
      const { key, value, expiration } = await request.json();
      if (!key || value === undefined) {
        return new Response(JSON.stringify({ error: 'Key and value are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 注意：每次 put 操作会消耗写入配额（免费计划每月 1 万次）
      try {
        await env.MODEL_PI.put(key, value, { 
          expiration: expiration ? Math.floor(Date.now() / 1000) + expiration : undefined 
        });
        return new Response(JSON.stringify({ success: true, key }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } 
    // 预订数据 API
    else if (path === '/api/orders/get') {
      const pioneerId = url.searchParams.get('pioneerId');
      if (!pioneerId) {
        return new Response(JSON.stringify({ error: 'Pioneer ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const order = await kvAPI.getOrder(pioneerId);
        return new Response(JSON.stringify({ order }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    else if (path === '/api/orders/save') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }
      
      try {
        const orderData: OrderData = await request.json();
        await kvAPI.saveOrder(orderData);
        return new Response(JSON.stringify({ success: true, orderId: orderData.orderId }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    // 用户偏好设置 API
    else if (path === '/api/preferences/get') {
      const userId = url.searchParams.get('userId');
      if (!userId) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const preferences = await kvAPI.getUserPreference(userId);
        return new Response(JSON.stringify({ preferences }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    else if (path === '/api/preferences/save') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }
      
      try {
        const prefData: UserPreference = await request.json();
        await kvAPI.saveUserPreference(prefData);
        return new Response(JSON.stringify({ success: true, userId: prefData.userId }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    // 先锋申请 API
    else if (path === '/api/applications/get') {
      const appId = url.searchParams.get('applicationId');
      if (!appId) {
        return new Response(JSON.stringify({ error: 'Application ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const application = await kvAPI.getApplication(appId);
        return new Response(JSON.stringify({ application }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    else if (path === '/api/applications/save') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }
      
      try {
        const appData: ApplicationData = await request.json();
        await kvAPI.saveApplication(appData);
        return new Response(JSON.stringify({ success: true, applicationId: appData.applicationId }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    // 统计数据 API
    else if (path === '/api/stats/get') {
      try {
        const stats = await kvAPI.getStats();
        return new Response(JSON.stringify({ stats }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    // 播报消息 API
    else if (path === '/api/broadcast/get') {
      try {
        const broadcasts = await kvAPI.getRecentBroadcasts();
        return new Response(JSON.stringify({ broadcasts }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    else if (path === '/api/broadcast/add') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }
      
      try {
        const broadcastData: BroadcastData = await request.json();
        await kvAPI.addBroadcast(broadcastData);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    else {
      return new Response('Tesla Model Pi Cloudflare Worker', {
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};