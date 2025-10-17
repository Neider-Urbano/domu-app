export interface ResumenData {
  monto: number;
  total: number;
  pagados: number;
  nombre: string;
}

export interface Movimiento {
  name: string;
  amount: number;
}

export interface OwnerHomeData {
  cobrosPendientes: number;
  arriendosPorVencer: number;
  resumen: ResumenData;
  movimientos: Movimiento[];
  acciones: string[];
}

export interface ContratoData {
  monto: number;
  fechaInicio: string;
  nombre: string;
}

export interface TenantHomeData {
  contrato: ContratoData;
  pagosRealizados: number;
  proximoVencimiento: string;
  movimientos: Movimiento[];
  acciones: string[];
}

export interface CardResumenProps {
  title: string;
  data: {
    monto: number;
    nombre: string;
    total?: number;
    pagados?: number;
    fechaInicio?: string;
  };
}

export interface CardSmallProps {
  title: string;
  value: string | number;
}

export interface QuickActionsProps {
  title: string;
  actions: string[];
}

export interface MovementsListProps {
  title: string;
  data: Movimiento[];
}
