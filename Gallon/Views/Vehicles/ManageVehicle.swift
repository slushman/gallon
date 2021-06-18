//
//  ManageVehicle.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct ManageVehicle: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var presentationMode
    
    var vehicleToEdit: Vehicle?
    
    @State var name = ""
    @State var make = ""
    @State var model = ""
    @State var year = ""
    @State var odometer: Float = 0
    @State var vin = ""
    @State var licensePlateState = ""
    @State var licensePlateNumber = ""
    @State var color = ""
    @State var engineSize = ""
    @State var purchaseDate = Date()
    @State private var showOptionalFields: Bool = false
    
    var dateFormatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter
    }
    
    var title: String {
        vehicleToEdit == nil ? "Add Vehicle" : "Edit Vehicle"
    }
    
    var body: some View {
        NavigationView {
            VStack {
                VehicleImageField(vehicleName: name)

                Form {
                    Section(header: Text("Vehicle Details")) {
                        TextField("Vehicle Name", text: $name)
                        
                        TextField("Year", text: $year)

                        TextField("Make", text: $make)
                        
                        TextField("Model", text: $model)
                        
                        NumberField("Odometer", value: $odometer)
                    }
                    
                    Section {
                        Toggle(isOn: $showOptionalFields) {
                            Text("Show optional fields")
                        }

                        if showOptionalFields {
                            DatePicker(selection: $purchaseDate, in: ...Date(), displayedComponents: .date) {
                                            Text("Purchase date")
                                        }
                            
                            TextField("VIN", text: $vin)
                            
                            TextField("License Plate State", text: $licensePlateState)
                            
                            TextField("License Plate Number", text: $licensePlateNumber)
                            
                            TextField("Color", text: $color)
                            
                            TextField("Engine Size", text: $engineSize)
                        }
                    }
                    
                    NavigationLink(destination: ProvidersList()) {
                        Text("Service Providers")
                    }
                    
                    NavigationLink(destination: OverridesList()) {
                        Text("Mileage Overrides")
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
        let vehicle: Vehicle

        if let vehicleToEdit = self.vehicleToEdit {
            vehicle = vehicleToEdit
        } else {
            vehicle = Vehicle(context: self.moc)
            vehicle.id = UUID()
        }

        vehicle.name = self.name
        vehicle.make = self.make
        vehicle.model = self.model
        vehicle.year = self.year
        vehicle.odometer = self.odometer
        vehicle.vin = self.vin
        vehicle.licensePlateState = self.licensePlateState
        vehicle.licensePlateNumber = self.licensePlateNumber
        vehicle.color = self.color
        vehicle.engineSize = self.engineSize
        vehicle.purchaseDate = Date()
        
        try? self.moc.save()
        
        self.presentationMode.wrappedValue.dismiss()
    }
}

struct ManageVehicle_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        return ManageVehicle()
    }
}
