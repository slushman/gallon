//
//  Override+CoreDataProperties.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 6/4/21.
//
//

import Foundation
import CoreData


extension Override {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Override> {
        return NSFetchRequest<Override>(entityName: "Override")
    }

    @NSManaged public var id: UUID?
    @NSManaged public var miles: Float
    @NSManaged public var service: String
    @NSManaged public var vehicle: String?

    var wService: ServiceType {
        get {
            return ServiceType(rawValue: self.service) ?? ServiceType.ACSystem
        }
        set {
            self.service = newValue.rawValue
        }
    }
    
    var wVehicle: String {
        vehicle ?? "Unknown vehicle"
    }
}

extension Override : Identifiable {

}
