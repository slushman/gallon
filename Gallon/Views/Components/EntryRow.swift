//
//  EntryRow.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

func convertFromString(typeString: String) -> EntryType {
    switch typeString {
    case "Service":
        return EntryType.Service
    case "Fill-Up":
        return EntryType.Fillup
    default:
        return EntryType.Fillup
    }
}

struct EntryRow: View {
    @Environment(\.managedObjectContext) var moc
    let entry: Entry
    
    var icon: String {
        switch convertFromString(typeString: entry.type) {
        case EntryType.Service:
            return "wrench.and.screwdriver"
        default:
            return "speedometer"
        }
    }
    
    var body: some View {
        NavigationLink(destination: EntryDetails(entry: entry)) {
            HStack {
                Image(systemName: icon)
                    .imageScale(.large)
                    .foregroundColor(Color.green)
                Text(entry.formattedDate)
                    .padding()
                Spacer()
            }
        }
    }
}

struct EntryRow_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let entry = Entry(context: moc)
        entry.date = Date(timeIntervalSinceNow: -(86400 * 2))
        entry.gallons = 18
        entry.odometer = 123456
        entry.price = 28.75
        entry.type = EntryType.Fillup.rawValue

        return EntryRow(entry: entry)
    }
}
