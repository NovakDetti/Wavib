export interface BusinessSettings {
  companyName: string;
  brandDisplayName: string;
  contactEmail: string;
  timezone: string;
  defaultLanguage: string;
  whatsappBusiness: {
    status: 'connected' | 'disconnected';
    channelId: string | null;
    connectedAt: string | null;
  };
}


export function getBusinessSettings(): BusinessSettings {
  return {
    companyName: 'Acme Corporation',
    brandDisplayName: 'Acme',
    contactEmail: 'contact@acme.com',
    timezone: 'Europe/Budapest',
    defaultLanguage: 'hu',
    whatsappBusiness: {
      status: 'disconnected',
      channelId: null,
      connectedAt: null,
    },
  };
}