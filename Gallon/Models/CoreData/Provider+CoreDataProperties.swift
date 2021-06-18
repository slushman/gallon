//
//  Provider+CoreDataProperties.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//
//

import Foundation
import CoreData


extension Provider {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Provider> {
        return NSFetchRequest<Provider>(entityName: "Provider")
    }

    @NSManaged public var service: String
    @NSManaged public var phone: String?
    @NSManaged public var name: String?
    @NSManaged public var id: UUID?

    var wService: ServiceType {
        get {
            return ServiceType(rawValue: self.service) ?? ServiceType.ACSystem
        }
        set {
            self.service = newValue.rawValue
        }
    }
    
    var wPhone: String {
        phone ?? "Unknown phone number"
    }
    
    var wName: String {
        name ?? "Unknown name"
    }
}

extension Provider : Identifiable {

}
