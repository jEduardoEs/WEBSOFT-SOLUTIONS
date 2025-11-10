export type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP' | 'ARS';

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
