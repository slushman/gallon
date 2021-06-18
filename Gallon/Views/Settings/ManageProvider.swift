//
//  ManageProvider.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/21/21.
//

import SwiftUI
import CoreData

struct ManageProvider: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var presentationMode
    
    var providerToEdit: Provider?
    
    @State var name = ""
    @State var phone = ""
    @State var service = ""
    
    var title: String {
        providerToEdit == nil ? "Add Provider" : "Edit Provider"
    }

    var body: some View {
        VStack {
            VStack {
                Form {
                    Section(header: Text("Provider Details")) {
                        TextField("Provider Name", text: $name)
                        
                        TextField("Phone Number", text: $phone)

                        TextField("Service", text: $service)
                    }
                }
            }
            .navigationTitle(title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: ProvidersList()) {
                        Text("Save")
                            .foregroundColor(Color.green)
                            .padding()
                            .onTapGesture {
                                self.onSaveTapped()
                            }
                    }
                }
            }
        }
    }
    
    private func onSaveTapped() {
        let provider: Provider

        if let providerToEdit = self.providerToEdit {
            provider = providerToEdit
        } else {
            provider = Provider(context: self.moc)
            provider.id = UUID()
        }

        provider.name = self.name
        provider.phone = self.phone
        provider.service = self.service
        
        try? self.moc.save()
        
        self.presentationMode.wrappedValue.dismiss()
    }
}

struct ManageProvider_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        ManageProvider()
    }
}
