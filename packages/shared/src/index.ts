export type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP' | 'ARS';

export function formatCurrency(
  value: number,
  currency: CurrencyCode | string = 'MXN',
  locale = 'es-MX',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: typeof currency === 'string' ? currency : (currency as CurrencyCode),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: CurrencyCode | string;
  isActive: boolean;
  tags?: string[];
  featured?: boolean;
  image?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'consulting' | 'maintenance' | 'development' | 'training';
  price: number;
  currency: CurrencyCode | string;
  billingCycle: 'one-time' | 'monthly' | 'quarterly' | 'annual';
  highlights: string[];
}

export type UserRole = 'guest' | 'customer' | 'employee' | 'admin' | 'superadmin';

export interface RolePermission {
  role: UserRole;
  description: string;
  capabilities: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export type OrderStatus = 'draft' | 'paid' | 'canceled' | 'fulfilled';

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  invoiceId?: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  issuedAt: string;
  subtotal: number;
  taxes: number;
  total: number;
  currency: CurrencyCode | string;
}

export interface Sale {
  id: string;
  employeeId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: string;
  invoiceId?: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  generatedAt: string;
  metrics: DashboardStat[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
}

export interface CrmModule {
  id: string;
  title: string;
  description: string;
  roleFocus: UserRole[];
  highlights: string[];
}

export interface PortalFeature {
  id: string;
  title: string;
  description: string;
  cta: string;
}

export type CustomerHealth = 'excellent' | 'good' | 'at-risk';

export interface CustomerAccount {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  plan: string;
  status: 'active' | 'onboarding' | 'suspended';
  health: CustomerHealth;
  annualValue: number;
  lastInteraction: string;
  tags: string[];
}

export interface SupportTicket {
  id: string;
  customerId: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  owner: string;
}

export interface BillingSummary {
  month: string;
  revenue: number;
  invoicesIssued: number;
  collectedRate: number;
  currency: CurrencyCode | string;
}

export interface ActivityEntry {
  id: string;
  type: 'meeting' | 'invoice' | 'ticket' | 'deal' | 'deployment';
  description: string;
  timestamp: string;
  owner: string;
}

export interface SalesGoal {
  id: string;
  label: string;
  progress: number;
  target: number;
}

export interface CompanyProfile {
  name: string;
  tagline: string;
  mission: string;
  vision: string;
  contactEmail: string;
  phone: string;
  address: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const companyProfile: CompanyProfile = {
  name: 'WEBSOFT SOLUTIONS',
  tagline: 'Tecnología inteligente para negocios ambiciosos',
  mission:
    'Diseñar, implementar y acompañar soluciones tecnológicas que potencien el crecimiento digital de nuestros clientes.',
  vision:
    'Ser el aliado estratégico de referencia en transformación digital para PyMEs y empresas en expansión en Latinoamérica.',
  contactEmail: 'contacto@websoftsolutions.com',
  phone: '+52 55 0000 0000',
  address: 'Av. Innovación 123, Ciudad de México, CDMX',
};

export const catalogProducts: Product[] = [
  {
    id: 'prod-cloud-suite',
    name: 'Cloud Suite Empresarial',
    description: 'Infraestructura en la nube escalable con monitoreo 24/7 y soporte premium.',
    price: 149.99,
    currency: 'USD',
    isActive: true,
    tags: ['cloud', 'infraestructura', 'soporte'],
    featured: true,
  },
  {
    id: 'prod-cyber-protect',
    name: 'CyberProtect 360',
    description: 'Paquete integral de ciberseguridad con respuesta a incidentes y capacitación.',
    price: 89.99,
    currency: 'USD',
    isActive: true,
    tags: ['seguridad', 'capacitacion'],
  },
  {
    id: 'prod-analytics-ai',
    name: 'Analytics AI Insights',
    description: 'Plataforma de analítica con dashboards personalizados y modelos predictivos.',
    price: 199.0,
    currency: 'USD',
    isActive: true,
    tags: ['analitica', 'ia'],
  },
  {
    id: 'prod-helpdesk',
    name: 'Helpdesk Omnicanal',
    description: 'Gestión de tickets en múltiples canales con automatizaciones y base de conocimiento.',
    price: 59.99,
    currency: 'USD',
    isActive: true,
    tags: ['soporte', 'automatizacion'],
  },
];

export const catalogServices: Service[] = [
  {
    id: 'serv-transformacion',
    name: 'Transformación Digital 360°',
    description:
      'Consultoría para mapear procesos, implementar herramientas y capacitar equipos en adopción digital.',
    category: 'consulting',
    price: 2499,
    currency: 'USD',
    billingCycle: 'one-time',
    highlights: ['Assessment inicial', 'Roadmap estratégico', 'Capacitación ejecutiva'],
  },
  {
    id: 'serv-mantenimiento',
    name: 'Mantenimiento Preventivo TI',
    description: 'Supervisión periódica de infraestructura, parches de seguridad y monitoreo proactivo.',
    category: 'maintenance',
    price: 499,
    currency: 'USD',
    billingCycle: 'monthly',
    highlights: ['Monitoreo 24/7', 'Gestión de parches', 'Reportes mensuales'],
  },
  {
    id: 'serv-fabrica-software',
    name: 'Fábrica de Software Ágil',
    description: 'Equipo dedicado de desarrollo para construir y evolucionar productos digitales.',
    category: 'development',
    price: 3499,
    currency: 'USD',
    billingCycle: 'monthly',
    highlights: ['Squad dedicado', 'Scrum Masters certificados', 'Deploy continuo'],
  },
  {
    id: 'serv-academia',
    name: 'Academia WebSoft',
    description: 'Programas de capacitación técnica y certificaciones en nube, ciberseguridad y datos.',
    category: 'training',
    price: 799,
    currency: 'USD',
    billingCycle: 'quarterly',
    highlights: ['Mentores expertos', 'Laboratorios prácticos', 'Certificaciones oficiales'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Laura Sánchez',
    role: 'Directora de Operaciones - Fintech MX',
    quote:
      'WebSoft Solutions transformó nuestro backoffice en tres meses. Ahora operamos con datos en tiempo real y un equipo alineado.',
  },
  {
    id: 'test-2',
    name: 'Carlos Rivera',
    role: 'CEO - RetailNow',
    quote:
      'El POS y la reportería que implementaron nos permitió duplicar las ventas y entender mejor a nuestros clientes.',
  },
  {
    id: 'test-3',
    name: 'Mariana López',
    role: 'CTO - HealthCare 4.0',
    quote:
      'Su equipo nos acompaña día a día con monitoreo proactivo y soporte especializado. Son nuestros socios tecnológicos.',
  },
];

export const partners: Partner[] = [
  { id: 'partner-aws', name: 'AWS Advanced Partner' },
  { id: 'partner-microsoft', name: 'Microsoft Solutions' },
  { id: 'partner-google', name: 'Google Cloud Build' },
  { id: 'partner-stripe', name: 'Stripe Verified Partner' },
];

export const crmModules: CrmModule[] = [
  {
    id: 'crm-sales',
    title: 'Ventas y pipeline inteligente',
    description:
      'Seguimiento de oportunidades con etapas configurables, recordatorios automáticos y proyecciones de ingresos.',
    roleFocus: ['employee', 'admin'],
    highlights: [
      'Pipeline visual Kanban',
      'Pronóstico por trimestre',
      'Alertas de estancamiento',
    ],
  },
  {
    id: 'crm-billing',
    title: 'Facturación y suscripciones',
    description:
      'Controla facturas electrónicas, pagos recurrentes y conciliaciones contables con reportes descargables.',
    roleFocus: ['employee', 'admin'],
    highlights: [
      'Timbrado automático',
      'Reintentos de cobro',
      'Exportaciones a ERP',
    ],
  },
  {
    id: 'crm-support',
    title: 'Soporte omnicanal',
    description:
      'Gestiona tickets desde correo, chat y WhatsApp con SLA configurables y base de conocimiento integrada.',
    roleFocus: ['employee', 'admin', 'superadmin'],
    highlights: [
      'Enrutamiento inteligente',
      'Encuestas NPS automáticas',
      'Panel en tiempo real',
    ],
  },
  {
    id: 'crm-executive',
    title: 'Tableros ejecutivos',
    description:
      'Visión 360° del negocio con métricas de retención, MRR, crecimiento y salud de clientes en un solo lugar.',
    roleFocus: ['admin', 'superadmin'],
    highlights: [
      'MRR vs. objetivo',
      'Clientes en riesgo',
      'Forecast de expansión',
    ],
  },
];

export const customerPortalFeatures: PortalFeature[] = [
  {
    id: 'portal-orders',
    title: 'Pedidos y facturas 24/7',
    description:
      'Tus clientes descargan facturas, consultan órdenes y programan renovaciones sin depender del equipo interno.',
    cta: 'Conoce el portal de clientes',
  },
  {
    id: 'portal-support',
    title: 'Centro de soporte dedicado',
    description:
      'Ticketing con SLA personalizados, chat en vivo y respuestas sugeridas por IA.',
    cta: 'Abrir mesa de ayuda',
  },
  {
    id: 'portal-analytics',
    title: 'Insights personalizados',
    description:
      'Dashboards de consumo, licencias y contratos compartidos con tus clientes estratégicos.',
    cta: 'Compartir tablero',
  },
];

export const customerAccounts: CustomerAccount[] = [
  {
    id: 'account-001',
    companyName: 'Grupo Altavista',
    contactName: 'Laura Méndez',
    email: 'laura@altavista.com',
    plan: 'Enterprise Cloud',
    status: 'active',
    health: 'excellent',
    annualValue: 54000,
    lastInteraction: '2024-05-08T15:30:00.000Z',
    tags: ['cloud', 'soporte-premium'],
  },
  {
    id: 'account-002',
    companyName: 'RetailNow',
    contactName: 'Miguel Torres',
    email: 'miguel@retailnow.mx',
    plan: 'POS + Facturación',
    status: 'onboarding',
    health: 'good',
    annualValue: 22800,
    lastInteraction: '2024-05-07T09:00:00.000Z',
    tags: ['retail', 'pos'],
  },
  {
    id: 'account-003',
    companyName: 'HealthCare 4.0',
    contactName: 'Mariana López',
    email: 'mariana@healthcare40.com',
    plan: 'Analytics + Seguridad',
    status: 'active',
    health: 'at-risk',
    annualValue: 37200,
    lastInteraction: '2024-04-29T17:45:00.000Z',
    tags: ['salud', 'ia'],
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: 'ticket-231',
    customerId: 'account-003',
    subject: 'Actualización de dashboard de analítica',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-05-07T12:15:00.000Z',
    owner: 'Alejandra Ventas',
  },
  {
    id: 'ticket-232',
    customerId: 'account-001',
    subject: 'Consulta sobre integración con ERP',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-05-08T08:00:00.000Z',
    owner: 'Equipo Soporte',
  },
  {
    id: 'ticket-233',
    customerId: 'account-002',
    subject: 'Capacitación adicional POS',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-05-05T10:25:00.000Z',
    owner: 'Equipo Implementación',
  },
];

export const billingSummaries: BillingSummary[] = [
  { month: 'Mar 2024', revenue: 48200, invoicesIssued: 54, collectedRate: 0.94, currency: 'USD' },
  { month: 'Abr 2024', revenue: 51750, invoicesIssued: 61, collectedRate: 0.96, currency: 'USD' },
  { month: 'May 2024', revenue: 54580, invoicesIssued: 64, collectedRate: 0.97, currency: 'USD' },
];

export const activityTimeline: ActivityEntry[] = [
  {
    id: 'activity-001',
    type: 'deal',
    description: 'Cierre de oportunidad con RetailNow por $19,900 USD.',
    timestamp: '2024-05-07T18:00:00.000Z',
    owner: 'Alejandra Ventas',
  },
  {
    id: 'activity-002',
    type: 'invoice',
    description: 'Factura inv-002 pagada por Analytics AI Insights.',
    timestamp: '2024-05-03T09:05:00.000Z',
    owner: 'Equipo Facturación',
  },
  {
    id: 'activity-003',
    type: 'meeting',
    description: 'Reunión de QBR con Grupo Altavista: renovación y upsell.',
    timestamp: '2024-05-02T15:30:00.000Z',
    owner: 'Carla CEO',
  },
  {
    id: 'activity-004',
    type: 'ticket',
    description: 'Ticket 231 escalado a soporte de analítica.',
    timestamp: '2024-05-07T12:45:00.000Z',
    owner: 'Mesa de ayuda',
  },
];

export const salesGoals: SalesGoal[] = [
  { id: 'goal-001', label: 'Objetivo MRR Q2', progress: 68, target: 100 },
  { id: 'goal-002', label: 'Renovaciones Enterprise', progress: 54, target: 80 },
  { id: 'goal-003', label: 'Ventas POS nuevas sucursales', progress: 32, target: 60 },
];

export const rolePermissions: RolePermission[] = [
  {
    role: 'guest',
    description: 'Visitante explorando el catálogo público.',
    capabilities: [
      'Explorar landing page',
      'Consultar catálogo de productos y servicios',
      'Enviar formulario de contacto',
    ],
  },
  {
    role: 'customer',
    description: 'Cliente autenticado con beneficios adicionales.',
    capabilities: [
      'Gestionar carrito y compras',
      'Descargar facturas y seguimiento de órdenes',
      'Acceso a soporte prioritario',
    ],
  },
  {
    role: 'employee',
    description: 'Colaborador encargado de ventas y facturación.',
    capabilities: [
      'Acceder al POS y registrar ventas',
      'Generar facturación y notas de crédito',
      'Visualizar catálogo interno con precios especiales',
    ],
  },
  {
    role: 'admin',
    description: 'Administrador con acceso a reportes y gestión operativa.',
    capabilities: [
      'Crear y actualizar productos y servicios',
      'Supervisar ventas, inventario y métricas clave',
      'Gestionar usuarios, roles y promociones',
    ],
  },
  {
    role: 'superadmin',
    description: 'Responsable de la configuración global y auditoría.',
    capabilities: [
      'Asignar roles avanzados y permisos',
      'Auditar actividad y seguridad',
      'Administrar integraciones críticas y respaldos',
    ],
  },
];

export const dashboardStats: DashboardStat[] = [
  { label: 'Ventas del mes', value: '$124,500', trend: 12.5, trendLabel: 'vs. mes anterior' },
  { label: 'Tickets resueltos', value: '325', trend: 8.2, trendLabel: 'SLA cumplido' },
  { label: 'Clientes activos', value: '210', trend: 5.4, trendLabel: 'Renovaciones' },
  { label: 'Tasa de conversión', value: '4.6%', trend: 1.1, trendLabel: 'Campañas digitales' },
];

export const sampleOrders: Order[] = [
  {
    id: 'order-001',
    userId: 'customer-001',
    items: [
      { productId: 'prod-cloud-suite', quantity: 1, unitPrice: 149.99 },
      { productId: 'prod-helpdesk', quantity: 1, unitPrice: 59.99 },
    ],
    status: 'paid',
    createdAt: '2024-05-01T10:15:00.000Z',
    invoiceId: 'inv-001',
  },
  {
    id: 'order-002',
    userId: 'customer-002',
    items: [{ productId: 'prod-analytics-ai', quantity: 1, unitPrice: 199 }],
    status: 'fulfilled',
    createdAt: '2024-05-03T09:00:00.000Z',
    invoiceId: 'inv-002',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-001',
    orderId: 'order-001',
    issuedAt: '2024-05-01T10:20:00.000Z',
    subtotal: 209.98,
    taxes: 33.6,
    total: 243.58,
    currency: 'USD',
  },
  {
    id: 'inv-002',
    orderId: 'order-002',
    issuedAt: '2024-05-03T09:05:00.000Z',
    subtotal: 199,
    taxes: 31.84,
    total: 230.84,
    currency: 'USD',
  },
];

export const salesPipeline: Sale[] = [
  {
    id: 'sale-001',
    employeeId: 'employee-001',
    customerName: 'Grupo Altavista',
    items: [{ productId: 'prod-cloud-suite', quantity: 1, unitPrice: 149.99 }],
    total: 149.99,
    status: 'completed',
    createdAt: '2024-05-05T16:30:00.000Z',
    invoiceId: 'inv-001',
  },
  {
    id: 'sale-002',
    employeeId: 'employee-002',
    customerName: 'RetailNow',
    items: [{ productId: 'prod-analytics-ai', quantity: 1, unitPrice: 199 }],
    total: 199,
    status: 'pending',
    createdAt: '2024-05-07T11:00:00.000Z',
  },
];

export const executiveReports: Report[] = [
  {
    id: 'report-001',
    title: 'Resumen Comercial',
    description: 'Rendimiento de ventas, facturación y renovación de clientes.',
    generatedAt: '2024-05-08T08:00:00.000Z',
    metrics: dashboardStats,
  },
];

export const companyUsers: User[] = [
  { id: 'customer-001', email: 'cliente@websoft.com', name: 'Cliente Demo', role: 'customer' },
  { id: 'employee-001', email: 'ventas@websoft.com', name: 'Alejandra Ventas', role: 'employee' },
  { id: 'admin-001', email: 'admin@websoft.com', name: 'Juan Admin', role: 'admin' },
  { id: 'superadmin-001', email: 'ceo@websoft.com', name: 'Carla CEO', role: 'superadmin' },
];
