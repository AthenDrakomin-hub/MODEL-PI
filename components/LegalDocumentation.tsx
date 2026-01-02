// components/LegalDocumentation.tsx
import React, { useState } from 'react';

const LegalDocumentation = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  const legalSections = {
    privacy: {
      title: '隐私政策 (Privacy Policy)',
      content: `
## 1. 引言
我们，Tesla Model π 专属店，尊重您的隐私。本政策阐述了当您访问我们的网站 https://www.model-pi.xyz/（下称"网站"）或购买我们的产品时，我们如何收集、使用、披露和保护您的个人信息。

## 2. 数据控制者
对于受GDPR管辖的数据处理，数据控制者为：
Tesla Model π Exclusive Store Europe Branch
567 Business Center Street, Berlin 10115, Germany
邮箱：model-pi@protonmail.com

## 3. 我们收集的信息
- **您提供的信息**：姓名、地址、电子邮件、电话号码、支付信息（如PayPal账户或加密货币地址）。
- **自动收集的信息**：IP地址、设备标识符、浏览器类型、访问时间、浏览页面。
- **来自第三方的信息**：支付处理器和物流供应商提供的交易与配送状态信息。

## 4. 数据处理的法律依据与目的（GDPR适用）
我们仅在具有合法依据的情况下处理您的个人数据：
- **履行合同**：为处理您的订单、交付产品并提供售后服务（依据：GDPR Art. 6(1)(b)）。
- **法律义务**：为履行税务、会计等法定义务（依据：GDPR Art. 6(1)(c)）。
- **合法权益**：用于网站安全、防止欺诈、以及在我们的合法权益不被您的数据保护利益所覆盖的情况下进行营销（依据：GDPR Art. 6(1)(f)）。
- **同意**：在征得您明确同意后，用于特定营销目的（依据：GDPR Art. 6(1)(a)）。您可以随时撤回同意。

## 5. 数据保留
我们仅在实现本政策所述目的所需的时间内保留您的数据，或遵守法定的保留期限（如税法要求）。订单数据通常保留7年以满足法律审计要求。

## 6. 您的权利（GDPR适用）
根据适用法律（特别是GDPR），您可能拥有以下权利：
- 访问、更正或删除您的个人数据。
- 限制或反对处理您的个人数据。
- 获取您的数据副本（数据可携带权）。
- 向监管机构投诉。

欲行使上述权利，请通过数据控制者联系方式与我们联系。

## 7. 国际数据传输
您的数据可能被传输到并存储在欧盟以外的国家。我们将确保采取适当保障措施（如欧盟标准合同条款）来保护此类传输。

## 8. 更新
我们可能不时更新本政策。更新版本将在网站发布后生效。
      `
    },
    terms: {
      title: '服务条款 (Terms of Service)',
      content: `
## 1. 协议接受
访问或使用本网站即表示您同意受本条款约束。

## 2. 账户
您有责任对您的账户保密，并对账户下所有活动负责。

## 3. 订单与支付
- **定金**：预订需支付订单总额的30%作为定金。若您因个人原因在支付定金后7天内取消，可退还定金的90%（扣除10%作为违约金）。7日后取消或未按时支付尾款，定金不予退还。
- **支付方式**：我们接受USDT（ERC20/TRC20）及PayPal。您需确保支付来源合法合规。

## 4. 配送
- 我们提供全球免费空运。标准配送时效为7-15个工作日，限量版为5-10个工作日，但受海关、物流等因素影响，我们不对此做出绝对保证。
- 您须负责支付目的地国家可能产生的所有关税、税费。

## 5. 用户行为准则
您同意不进行任何非法活动，或干扰网站正常运行。

## 6. 免责声明
- 产品图片仅供参考，以实物为准。
- 对于因不可抗力（如自然灾害、战争、政府行为、关键物流网络中断）造成的订单延误或取消，我们不承担责任。
      `
    },
    warranty: {
      title: '售后与保修政策',
      content: `
## 1. 保修期限
- 全球联保12个月（非人为损坏）。
- 保修期内，我们将免费维修或更换有缺陷的部件。

## 2. 保修范围
- 保修涵盖制造缺陷和材料缺陷。
- 不包括人为损坏、意外损坏、正常磨损或不当使用造成的损坏。

## 3. 保修申请
- 请通过客服渠道提交保修申请，并提供购买凭证和产品序列号。
- 我们将指导您完成保修流程。
      `
    },
    refund: {
      title: '退货退款政策',
      content: `
## 1. 法定撤销权（适用于欧盟及有类似规定的地区）
根据欧盟《消费者权利指令》，欧盟居民在购买商品后通常享有14天无理由退货权。此权利自您签收商品之日起算。

## 2. 例外情况
在以下情况下，上述法定撤销权可能不适用：
- 根据您的明确要求个性化定制的商品。
- 因卫生原因不宜退货且密封包装已被拆封的商品。
- 已与您的设备进行不可分割的软件激活或配置的商品。

针对折叠限量AI版：由于该版本在您下单后即启动专属的软件配置与深度硬件调校，该过程使其成为"根据消费者个人规格定制"的商品。因此，一旦生产流程启动，您可能无法行使法定的14天无理由退货权。质量保修依然适用。

## 3. 退货流程
- 如需退货（基于质量问题或适用撤销权），请在签收后7个工作日内联系客服。
- 商品必须保持全新、未使用、包装完好。
- 经我们批准退货后，您需将商品寄回指定地址。若因质量问题退货，运费由我们承担；若因无理由退货（如适用），运费由您承担。
- 退款将在收到并验收退货后的3-5个工作日内处理。
      `
    },
    legal: {
      title: '法律声明 (Legal Notice)',
      content: `
## 1. 知识产权
本网站所有内容（商标、文本、图像）均归 Tesla Model π 专属店或其许可方所有。未经明确书面授权，禁止使用。

## 2. 责任限制
在法律允许的最大范围内，我们不对因使用本网站或产品而产生的任何间接、附带或后果性损害负责。

## 3. 完整协议
本文件（包括《隐私政策》、《服务条款》、《退货政策》等）构成您与我们之间关于网站和产品使用的完整协议。

## 4. 管辖法律与争议解决
- **管辖法律**：本文件应受美国加利福尼亚州法律管辖，并依其解释，不冲突法原则除外。
- **争议解决**：因本文件或您的购买行为引起的任何争议，双方应首先尝试友好协商。协商不成的，双方同意将争议提交至美国加利福尼亚州圣克拉拉县有管辖权的法院进行诉讼解决。

## 5. 联系我们
对于任何法律文件相关问题，请联系：
Tesla Model π Exclusive Store
1234 Silicon Valley Parkway, San Francisco, California 94103, USA
邮箱：model-pi@protonmail.com
      `
    },
    compliance: {
      title: '产品合规文件',
      content: `
## 1. 美国 FCC ID 认证证书
FCC ID：FCC-ID-MPI-202601

## 2. 欧盟 CE 符合性声明
产品符合欧盟相关指令和法规要求。

## 3. 英国 UKCA 符合性声明
产品符合英国相关法规要求。

## 4. 其他地区认证
产品符合相关地区法规要求。
      `
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">法律文件</h1>
      
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {Object.entries(legalSections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeSection === key
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg">
        {legalSections[activeSection as keyof typeof legalSections]?.content && (
          <div 
            className="legal-content"
            dangerouslySetInnerHTML={{ 
              __html: legalSections[activeSection as keyof typeof legalSections].content
                .replace(/\n## /g, '</div><div><h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">')
                .replace(/\n# /g, '</div><div><h1 class="text-3xl font-bold mt-8 mb-4 text-gray-800">')
                .replace(/\n- /g, '<br/>• ')
                .replace(/<br\/>• /, '• ')
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LegalDocumentation;