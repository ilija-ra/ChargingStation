export class VehicleGetAllDto {
    items?: VehicleGetAllItemDto[];
}

export class VehicleGetAllItemDto {
    id?: string;
    manufacturer?: string;
    vehicleModel?: string;
    batteryCapacity?: number;
    chargingProtocol?: string;
}