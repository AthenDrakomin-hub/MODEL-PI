// components/CompliancePage.tsx
import React from 'react';
import LegalDocumentation from './LegalDocumentation';

const CompliancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            合规与法律信息
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tesla Model π 专属店 - 完整的法律文件、隐私政策和产品合规信息
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">隐私保护</h3>
            <p className="text-gray-400">
              我们严格遵守GDPR等隐私法规，保护您的个人信息安全
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">产品合规</h3>
            <p className="text-gray-400">
              通过FCC、CE、UKCA等国际认证，确保产品质量与安全
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">服务保障</h3>
            <p className="text-gray-400">
              全球联保服务，完善的售后保障体系
            </p>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
          <LegalDocumentation />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-500">
          <div>
            <h4 className="font-bold text-white mb-2">联系我们</h4>
            <p>Tesla Model π Exclusive Store</p>
            <p>1234 Silicon Valley Parkway</p>
            <p>San Francisco, California 94103, USA</p>
            <p className="mt-2">Email: model-pi@protonmail.com</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">欧洲分部</h4>
            <p>Tesla Model π Exclusive Store Europe Branch</p>
            <p>567 Business Center Street</p>
            <p>Berlin 10115, Germany</p>
            <p className="mt-2">Email: model-pi@protonmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;