//
//  ProvidersList.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/21/21.
//

import SwiftUI
import CoreData

struct ProvidersList: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var presentationMode
    
    @FetchRequest(entity: Provider.entity(), sortDescriptors: [])
    var providers: FetchedResults<Provider>
    
    @State private var activeSheet: ActiveSheet?
    
    init() {
        UINavigationBar.appearance().tintColor = UIColor(red: 0.20, green: 0.78, blue: 0.35, alpha: 1.00)
    }

    var body: some View {
        VStack {
            if providers.count > 0 {
                List(providers, id: \.self) { provider in
                    ProviderRow(provider: provider)
                }
            } else {
                ProviderListBlankSlate()
            }

            Spacer()
        }
        .navigationTitle("Service Providers")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: ManageProvider()) {
                    Text("Add New")
                }
           }
        }
    }
}

struct ProvidersList_Previews: PreviewProvider {
    static var previews: some View {
        return NavigationView {
            ProvidersList()
        }
    }
}
