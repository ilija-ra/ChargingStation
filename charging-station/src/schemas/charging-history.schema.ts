import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ChargingHistory extends Document {
    @Prop({ required: true })
    date?: string;

    @Prop({ required: true })
    cost?: Number;

    @Prop({ required: true })
    paymentMethod?: string;

    @Prop({ required: true })
    takenEnergy?: Number;

    @Prop({ required: true })
    userId?: string;

    @Prop({ required: true })
    chargerId?: string;

    @Prop({ required: true })
    vehicleId?: string;

    @Prop({ required: true })
    appointmentId?: string;
}

export const ChargingHistorySchema = SchemaFactory.createForClass(ChargingHistory);