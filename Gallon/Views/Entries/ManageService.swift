//
//  ManageService.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct ManageService: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var presentationMode
    @State private var entryDate: Date = Date()
    @State private var odometer: Float = 0
    @State private var price: Float = 0.00
    // @State private var services: Set<ServiceType>
        
    var body: some View {
        NavigationView {
            VStack {
                Form {
                    Section {
                        DatePicker(selection: $entryDate, in: ...Date(), displayedComponents: [.date, .hourAndMinute]) {
                            Text("Date")
                        }

                        NumberField(label: "Price", value: $price)

                        NumberField(label: "Odometer", value: $odometer)
                                                
                        Text("Services")
                        
//                        ForEach(0..<services.count) { index in
//                            HStack {
//                                Text(services[index])
//                            }
//                        }
                    }
                }
            }
            .navigationTitle("Add Service")
            .toolbar {
                ToolbarItem(placement: .bottomBar) {
                    Text("Cancel")
                        .foregroundColor(Color.green)
                        .padding()
                        .onTapGesture {
                            self.presentationMode.wrappedValue.dismiss()
                        }
                }
                
                ToolbarItem(placement: .bottomBar) {
                    Text("Save")
                        .foregroundColor(Color.green)
                        .padding()
                        .onTapGesture {
                            // save service to user defaults or CoreData?
                            let entry = Entry(context: self.moc)
                            entry.id = UUID()
                            entry.date = self.entryDate
                            entry.odometer = self.odometer
                            entry.price = self.price
                            // entry.services = self.services
                            
                            try? self.moc.save()

                            self.presentationMode.wrappedValue.dismiss()
                        }
                }
            }
        }
    }
}

struct ManageService_Previews: PreviewProvider {
    static var previews: some View {
        ManageService()
    }
}
