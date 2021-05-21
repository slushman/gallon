//
//  Service+CoreDataProperties.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//
//

import Foundation
import CoreData


extension Service {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Service> {
        return NSFetchRequest<Service>(entityName: "Service")
    }

    @NSManaged public var id: UUID?
    @NSManaged public var name: String?
    @NSManaged public var entry: Entry?

    var wName: String {
        name ?? "Unknown name"
    }
}

extension Service : Identifiable {

}
