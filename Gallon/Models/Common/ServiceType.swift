//
//  ServiceType.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import Foundation

public enum ServiceType: String, CodingKey, CaseIterable, Decodable {
    case ACSystem = "A/C System"
    case Alignment = "Alignment"
    case Antifreeze = "Antifreeze"
    case BalanceTires = "Balance Tires"
    case Belts = "Belts"
    case BeltTiming = "Belt, Timing"
    case BrakesFront = "Brakes, Front"
    case BrakesRear = "Brakes, Rear"
    case CarWash = "Car Wash"
    case Electrical = "Electrical"
    case ExhaustSystem = "Exhaust System"
    case FilterAir = "Filter, Air"
    case FilterCabinAir = "Filter, Cabin Air"
    case FilterFuel = "Filter, Fuel"
    case FilterOil = "Filter, Oil"
    case FluidBrake = "Fluid, Brake"
    case FluidPowerSteering = "Fluid, Power Steering"
    case FlushRadiator = "Flush, Radiator"
    case FluidTransmission = "Fluid, Transmission"
    case FluidWindshieldWasher = "Fluid, Windshield Washer"
    case FlushCoolant = "Flush, Coolant"
    case FlushTransmission = "Flush, Transmission"
    case FuelPump = "Fuel Pump"
    case Inspection = "Inspection"
    case Lights = "Lights"
    case OilChange = "Oil Change"
    case Radiator = "Radiator"
    case RecallService = "Recall Service"
    case SparkPlugs = "Spark Plugs"
    case Starter = "Starter"
    case TireFrontDriver = "Tire, Front Driver"
    case TireRearDriver = "Tire, Rear Driver"
    case TireFrontPassenger = "Tire, Front Passenger"
    case TireRearPassenger = "Tire, Rear Passenger"
    case TireRotation = "Tire Rotation"
    case Tuneup = "Tune Up"
    case WaterPump = "Water Pump"
    case WindshieldWipers = "Windshield Wipers"
    case Other = "Other"
}
