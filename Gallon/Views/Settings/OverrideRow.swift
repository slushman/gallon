//
//  OverrideRow.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 6/4/21.
//

import SwiftUI
import CoreData

struct OverrideRow: View {
    @Environment(\.managedObjectContext) var moc
    let override: Override

    var body: some View {
        NavigationLink(destination: ManageOverride(
            overrideToEdit: override,
            miles: override.miles,
            service: override.service,
            vehicle: override.wVehicle
        )) {
            HStack {
                Text(override.service)
                    .padding()
                Spacer()
            }
        }
    }
}

struct OverrideRow_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let override = Override(context: moc)
        override.miles = 6000.00
        override.vehicle = "Ford F150 Lightning"
        override.service = ServiceType.OilChange.rawValue

        return OverrideRow(override: override)
    }
}
