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
    
    var vehicle: Vehicle
    var serviceEntryToEdit: Entry?

    @State var entryDate: Date = Date()
    @State var odometer: Float = 0
    @State var price: Float = 0.00
    // @State private var services: Set<ServiceType>
    
    var title: String {
        serviceEntryToEdit == nil ? "Add Service" : "Edit Service"
    }
        
    var body: some View {
        NavigationView {
            VStack {
                

                Form {
                    Section {
                        VehicleNameDisplayField(vehicle.wName)

                        DatePicker(selection: $entryDate, in: ...Date(), displayedComponents: [.date, .hourAndMinute]) {
                            Text("Date")
                        }

                        NumberField("Price", value: $price)

                        NumberField("Odometer", value: $odometer)
                                                
                        Text("Services")
                        
//                        ForEach(0..<services.count) { index in
//                            HStack {
//                                Text(services[index])
//                            }
//                        }
                    }
                }
            }
            .navigationTitle(title)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Text("Cancel")
                        .foregroundColor(Color.green)
                        .padding()
                        .onTapGesture {
                            self.presentationMode.wrappedValue.dismiss()
                        }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
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
    
    private func onSaveTapped() {
        let entry: Entry

        if let serviceEntryToEdit = self.serviceEntryToEdit {
            entry = serviceEntryToEdit
        } else {
            entry = Entry(context: self.moc)
            entry.id = UUID()
        }

        entry.date = self.entryDate
        entry.odometer = self.odometer
        entry.price = self.price
        // entry.services = self.services
        entry.vehicle = vehicle

        try? self.moc.save()

        self.presentationMode.wrappedValue.dismiss()
    }
}

struct ManageService_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let vehicle = Vehicle(context: moc)
        vehicle.name = "Scooby"
        vehicle.make = "Toyota"
        vehicle.model = "Prius"
        vehicle.year = "2010"

        return ManageService(vehicle: vehicle)
    }
}
