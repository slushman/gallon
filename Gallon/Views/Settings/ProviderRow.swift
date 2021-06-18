//
//  ProviderRow.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/21/21.
//

import SwiftUI
import CoreData

struct ProviderRow: View {
    @Environment(\.managedObjectContext) var moc
    let provider: Provider

    var body: some View {
        NavigationLink(destination: ManageProvider(
            providerToEdit: provider,
            name: provider.wName,
            phone: provider.wPhone,
            service: provider.service
        )) {
            HStack {
                Text(provider.wName)
                    .padding()
                Spacer()
            }
        }
    }
}

struct ProviderRow_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let provider = Provider(context: moc)
        provider.name = "Crown Toyota"
        provider.phone = "719-888-1234"
        provider.service = ServiceType.OilChange.rawValue

        return ProviderRow(provider: provider)
    }
}
