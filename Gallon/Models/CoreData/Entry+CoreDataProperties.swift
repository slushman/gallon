//
//  Entry+CoreDataProperties.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//
//

import Foundation
import CoreData


extension Entry {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Entry> {
        return NSFetchRequest<Entry>(entityName: "Entry")
    }

    @NSManaged public var type: String
    @NSManaged public var price: Float
    @NSManaged public var odometer: Float
    @NSManaged public var id: UUID?
    @NSManaged public var gallons: Float
    @NSManaged public var date: Date?
    @NSManaged public var services: NSSet?
    @NSManaged public var vehicle: Vehicle?
    
    var wDate: Date {
        date ?? Date()
    }
    
    var wServices: NSSet {
        services ?? []
    }
    
    var wType: EntryType {
        get {
            return EntryType(rawValue: self.type) ?? EntryType.Fillup
        }
        set {
            self.type = newValue.rawValue
        }
    }
    
    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter.string(from: wDate)
    }
    
//    var totalDistance: Float {
//        return odometer - previousOdometer!
//    }
    
//    var mpg: Float {
//        return totalDistance/gallons!
//    }
    
    var wGallons: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 3
        
        let number = NSNumber(value: gallons)
        let formatted = formatter.string(from: number)!
        
        return "\(formatted) gallons"
    }
    
//    var displayMPG: String {
//        let formatter = NumberFormatter()
//        formatter.numberStyle = .decimal
//        formatter.maximumFractionDigits = 1
//
//        let number = NSNumber(value: mpg)
//        let formatted = formatter.string(from: number)!
//
//        return "\(formatted) MPG"
//    }
    
    var wOdometer: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.usesGroupingSeparator = true
        
        let number = NSNumber(value: odometer)
        let formatted = formatter.string(from: number)!
        
        return "\(formatted)"
    }
    
    var wPrice: String {
        let formatter = NumberFormatter()
        formatter.usesGroupingSeparator = true
        formatter.numberStyle = .currency
        
        return formatter.string(from: NSNumber(value: price)) ?? "$0"
    }
}

// MARK: Generated accessors for services
extension Entry {

    @objc(addServicesObject:)
    @NSManaged public func addToServices(_ value: Service)

    @objc(removeServicesObject:)
    @NSManaged public func removeFromServices(_ value: Service)

    @objc(addServices:)
    @NSManaged public func addToServices(_ values: NSSet)

    @objc(removeServices:)
    @NSManaged public func removeFromServices(_ values: NSSet)

}

extension Entry : Identifiable {

}
