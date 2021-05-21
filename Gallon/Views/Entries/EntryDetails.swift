//
//  EntryDetails.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct EntryDetails: View {
    @Environment(\.presentationMode) var mode: Binding<PresentationMode>

    let entry: Entry

    var body: some View {
        if EntryType(rawValue: entry.type) == EntryType.Fillup {
            return AnyView(FillupDetails(entry: entry))
        } else {
            return AnyView(ServiceDetails(entry: entry))
        }
    }
}

struct EntryDetails_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let entry = Entry(context: moc)
        entry.date = Date(timeIntervalSinceNow: -86400)
        entry.odometer = 123456
        entry.price = 28.75
        entry.services = [ServiceType.OilChange, ServiceType.FilterOil]
        entry.type = EntryType.Service.rawValue

        return NavigationView {
            EntryDetails(entry: entry)
        }
    }
}
