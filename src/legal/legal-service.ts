// src/legal/legal-service.ts
// Tesla Model π 法律文件服务

interface LegalDocument {
  id: string;
  title: string;
  content: string;
  type: 'privacy' | 'terms' | 'warranty' | 'refund' | 'legal' | 'compliance';
  version: string;
  lastUpdated: string;
  language: string;
  isPublic: boolean;
}

interface ComplianceCertificate {
  id: string;
  name: string;
  certificateType: 'FCC' | 'CE' | 'UKCA' | 'OTHER';
  certificateId: string;
  issueDate: string;
  expiryDate?: string;
  documentUrl?: string;
  isPublic: boolean;
}

interface Env {
  MODEL_PI: KVNamespace;
  MODEL_PI_ASSETS: R2Bucket;
}

export class LegalService {
  private kv: KVNamespace;
  private r2: R2Bucket;

  constructor(env: Env) {
    this.kv = env.MODEL_PI;
    this.r2 = env.MODEL_PI_ASSETS;
  }

  /**
   * 创建或更新法律文档
   */
  async createOrUpdateLegalDocument(document: Omit<LegalDocument, 'id'> & { id?: string }): Promise<LegalDocument> {
    const documentId = document.id || `legal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const legalDoc: LegalDocument = {
      ...document,
      id: documentId,
      lastUpdated: new Date().toISOString()
    };

    // 存储到 KV
    await this.kv.put(`legal:document:${documentId}`, JSON.stringify(legalDoc), {
      expirationTtl: 60 * 60 * 24 * 365 // 1年过期
    });

    // 如果文档内容较大，也可以考虑存储在 R2 中，KV 中只存元数据
    if (document.content.length > 10000) { // 如果内容超过10KB
      const r2Key = `legal-documents/${documentId}.md`;
      await this.r2.put(r2Key, new TextEncoder().encode(document.content), {
        httpMetadata: {
          contentType: 'text/markdown'
        }
      });
      
      // 更新文档，将内容替换为 R2 URL
      legalDoc.content = `r2://${r2Key}`;
      await this.kv.put(`legal:document:${documentId}`, JSON.stringify(legalDoc));
    }

    return legalDoc;
  }

  /**
   * 获取法律文档
   */
  async getLegalDocument(documentId: string): Promise<LegalDocument | null> {
    const doc = await this.kv.get(`legal:document:${documentId}`, 'json') as LegalDocument;
    if (!doc) return null;

    // 如果内容是 R2 引用，获取实际内容
    if (doc.content.startsWith('r2://')) {
      const r2Key = doc.content.substring(5); // 移除 'r2://' 前缀
      const r2Object = await this.r2.get(r2Key);
      if (r2Object && r2Object.body) {
        const content = await r2Object.text();
        doc.content = content;
      }
    }

    return doc;
  }

  /**
   * 获取所有公开的法律文档
   */
  async getPublicLegalDocuments(): Promise<LegalDocument[]> {
    // 在实际实现中，可能需要维护一个索引或使用其他方法来获取所有文档
    // 这里简化为返回预定义的文档类型
    const documentTypes: (LegalDocument['type'])[] = ['privacy', 'terms', 'warranty', 'refund', 'legal', 'compliance'];
    const documents: LegalDocument[] = [];

    for (const type of documentTypes) {
      // 查找该类型的最新文档
      const latestDoc = await this.getLatestDocumentByType(type);
      if (latestDoc && latestDoc.isPublic) {
        documents.push(latestDoc);
      }
    }

    return documents;
  }

  /**
   * 根据类型获取最新文档
   */
  private async getLatestDocumentByType(type: LegalDocument['type']): Promise<LegalDocument | null> {
    // 这里需要实现查找特定类型最新文档的逻辑
    // 可以通过维护一个类型到最新文档ID的映射来实现
    const latestIdKey = `legal:latest:${type}`;
    const latestId = await this.kv.get(latestIdKey) as string;
    
    if (latestId) {
      return await this.getLegalDocument(latestId);
    }
    
    return null;
  }

  /**
   * 上传合规证书
   */
  async uploadComplianceCertificate(
    file: ArrayBuffer,
    name: string,
    certificateType: ComplianceCertificate['certificateType'],
    certificateId: string
  ): Promise<ComplianceCertificate> {
    const certificateIdFull = `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const r2Key = `compliance-certificates/${certificateType}/${certificateIdFull}/${name}`;

    // 上传到 R2
    await this.r2.put(r2Key, file, {
      httpMetadata: {
        contentType: this.getContentType(name),
        contentDisposition: `inline; filename="${name}"`
      },
      customMetadata: {
        certificateType,
        originalId: certificateId,
        uploadDate: new Date().toISOString()
      }
    });

    // 创建证书元数据
    const certificate: ComplianceCertificate = {
      id: certificateIdFull,
      name,
      certificateType,
      certificateId,
      issueDate: new Date().toISOString(),
      documentUrl: `${this.getPublicUrlPrefix()}/${r2Key}`,
      isPublic: true
    };

    // 存储元数据到 KV
    await this.kv.put(`legal:certificate:${certificateIdFull}`, JSON.stringify(certificate));

    return certificate;
  }

  /**
   * 获取合规证书
   */
  async getComplianceCertificate(certificateId: string): Promise<ComplianceCertificate | null> {
    return await this.kv.get(`legal:certificate:${certificateId}`, 'json') as ComplianceCertificate || null;
  }

  /**
   * 获取所有合规证书
   */
  async getAllComplianceCertificates(): Promise<ComplianceCertificate[]> {
    // 在实际实现中，这需要更复杂的索引机制
    // 这里简化实现，假设我们有索引
    const certificates: ComplianceCertificate[] = [];
    
    // 示例：获取特定类型的证书
    const types: ComplianceCertificate['certificateType'][] = ['FCC', 'CE', 'UKCA', 'OTHER'];
    
    for (const type of types) {
      const cert = await this.getLatestCertificateByType(type);
      if (cert) {
        certificates.push(cert);
      }
    }
    
    return certificates;
  }

  /**
   * 根据类型获取最新证书
   */
  private async getLatestCertificateByType(type: ComplianceCertificate['certificateType']): Promise<ComplianceCertificate | null> {
    const latestIdKey = `legal:latest:cert:${type}`;
    const latestId = await this.kv.get(latestIdKey) as string;
    
    if (latestId) {
      return await this.getComplianceCertificate(latestId);
    }
    
    return null;
  }

  /**
   * 更新文档索引
   */
  async updateDocumentIndex(document: LegalDocument): Promise<void> {
    // 更新类型到最新文档的映射
    const latestIdKey = `legal:latest:${document.type}`;
    await this.kv.put(latestIdKey, document.id);
    
    // 更新语言到文档的映射（如果需要多语言支持）
    const langKey = `legal:lang:${document.language}:${document.type}`;
    await this.kv.put(langKey, document.id);
  }

  /**
   * 根据内容类型获取 MIME 类型
   */
  private getContentType(fileName: string): string {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    
    const contentTypeMap: { [key: string]: string } = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.txt': 'text/plain',
      '.md': 'text/markdown'
    };
    
    return contentTypeMap[ext] || 'application/octet-stream';
  }

  /**
   * 获取公共 URL 前缀
   */
  private getPublicUrlPrefix(): string {
    // 在实际实现中，这应该是 R2 的公共访问 URL
    return `https://pub-${this.getAccountId()}.r2.dev`;
  }

  /**
   * 获取账户 ID
   */
  private getAccountId(): string {
    // 在实际 Worker 环境中，可能需要从其他地方获取
    return 'your-account-id'; // 应该从环境配置中获取
  }
}