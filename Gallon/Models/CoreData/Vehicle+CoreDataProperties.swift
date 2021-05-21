//
//  Vehicle+CoreDataProperties.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//
//

import Foundation
import CoreData


extension Vehicle {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Vehicle> {
        return NSFetchRequest<Vehicle>(entityName: "Vehicle")
    }

    @NSManaged public var year: String?
    @NSManaged public var vin: String?
    @NSManaged public var purchaseDate: Date?
    @NSManaged public var odometer: Float
    @NSManaged public var name: String?
    @NSManaged public var model: String?
    @NSManaged public var make: String?
    @NSManaged public var licensePlateState: String?
    @NSManaged public var licensePlateNumber: String?
    @NSManaged public var id: UUID?
    @NSManaged public var engineSize: String?
    @NSManaged public var color: String?
    @NSManaged public var entries: NSSet?
    
    var wColor: String {
        color ?? "Unknown"
    }
    
    var wEngineSize: String {
        engineSize ?? "Unknown"
    }
    var wLicensePlateNumber: String {
        licensePlateNumber ?? "Unknown"
    }
    
    var wLicensePlateState: String {
        licensePlateState ?? "Unknown"
    }
    
    var wMake: String {
        make ?? "Uknown Make"
    }
    
    var wModel: String {
        model ?? "Unknown Model"
    }
    
    var wName: String {
        name ?? "\(wYear) \(wMake) \(wModel)"
    }
    
    var wPurchaseDate: Date {
        purchaseDate ?? Date()
    }

    var wVin: String {
        vin ?? "Unknown"
    }
    
    var wYear: String {
        year ?? "Unknown Year"
    }
    
    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter.string(from: wPurchaseDate)
    }
    
    var wOdometer: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.usesGroupingSeparator = true
        
        let number = NSNumber(value: odometer)
        let formatted = formatter.string(from: number)!
        
        return "\(formatted)"
    }
}

// MARK: Generated accessors for entries
extension Vehicle {

    @objc(addEntriesObject:)
    @NSManaged public func addToEntries(_ value: Entry)

    @objc(removeEntriesObject:)
    @NSManaged public func removeFromEntries(_ value: Entry)

    @objc(addEntries:)
    @NSManaged public func addToEntries(_ values: NSSet)

    @objc(removeEntries:)
    @NSManaged public func removeFromEntries(_ values: NSSet)

}

extension Vehicle : Identifiable {

}
