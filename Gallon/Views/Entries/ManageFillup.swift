//
//  ManageFillup.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct ManageFillup: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var presentationMode
    
    var vehicle: Vehicle
    var fillupEntryToEdit: Entry?
    
    @State private var showingMPGAlert = false
    @State private var mpg: Float?

    @State var entryDate: Date = Date()
    @State var odometer: Float = 0 // set to previous odometer - maybe eventually have some smart data estimate the next odometer reading based on prell-ups
    @State var price: Float = 0
    @State var gallons: Float = 0

    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter
    }()
    
    var title: String {
        fillupEntryToEdit == nil ? "Add Fill-up" : "Edit Fill-up"
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    Form {
                        Section {
                            VehicleNameDisplayField(vehicle.wName)

                            DatePicker(selection: $entryDate, in: ...Date(), displayedComponents: [.date, .hourAndMinute]) {
                                Text("Date")
                            }

                            NumberField("Price", value: $price)

                            NumberField("Gallons", value: $gallons)
                            
                            NumberField("Odometer", value: $odometer)
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
                
                if (showingMPGAlert) {
                    CustomAlert(mpg: mpg ?? 0.0)
                }
            }
        }
    }
    
    private func onSaveTapped() {
        let entry: Entry

        if let fillupEntryToEdit = self.fillupEntryToEdit {
            entry = fillupEntryToEdit
        } else {
            entry = Entry(context: self.moc)
            entry.id = UUID()
        }

        entry.date = self.entryDate
        entry.odometer = self.odometer
        entry.price = self.price
        entry.gallons = self.gallons
        entry.vehicle = vehicle
        
        try? self.moc.save()
        
        self.presentationMode.wrappedValue.dismiss()
        
        
        
        
        
        
        // calculate the MPG for this fillup
        // set mpg state
        self.mpg = 28.2

        // check for any services within the mileage range
                                    
        // display pop-up by assigning the mpg for this fillup
        // to the mpg state.
        self.showingMPGAlert = true
    }
}

struct ManageFillup_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let vehicle = Vehicle(context: moc)
        vehicle.name = "Scooby"
        vehicle.make = "Toyota"
        vehicle.model = "Prius"
        vehicle.year = "2010"
        
        return ManageFillup(vehicle: vehicle)
    }
}
