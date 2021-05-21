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
    @State private var showingMPGAlert = false

    @State private var entryDate: Date = Date()
    @State private var odometer: Float = 0 // set to previous odometer - maybe eventually have some smart data estimate the next odometer reading based on previous fill-ups
    @State private var price: Float = 0
    @State private var gallons: Float = 0
    @State private var mpg: Float?

    // TODO: how to get an entry in here?
    // or does there need to be en "edit" form component
    // maybe something with Binding?

    //    let entry: Entry?
//
//    init() {
//        self.entryDate = self.entry?.entryDate ?? Date()
//        self.odometer = self.entry?.odometer ?? 0
//        self.price = self.entry?.price ?? 0.00
//        self.gallons = self.entry?.gallons ?? 0
//    }
    
    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter
    }()
    
    var body: some View {
        NavigationView {
            ZStack {
                VStack {
                    Form {
                        Section {
                            DatePicker(selection: $entryDate, in: ...Date(), displayedComponents: [.date, .hourAndMinute]) {
                                Text("Date")
                            }

                            NumberField(label: "Price", value: $price)

                            NumberField(label: "Gallons", value: $gallons)
                            
                            NumberField(label: "Odometer", value: $odometer)
                        }
                    }
                }
                .navigationTitle("Add Fill-up")
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
                                // save fillup to CoreData
                                let entry = Entry(context: self.moc)
                                entry.id = UUID()
                                entry.date = self.entryDate
                                entry.odometer = self.odometer
                                entry.price = self.price
                                entry.gallons = self.gallons
                                
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
                }
                
                if (showingMPGAlert) {
                    CustomAlert(mpg: mpg ?? 0.0)
                }
            }
        }
    }
}

struct ManageFillup_Previews: PreviewProvider {
    static var previews: some View {
        ManageFillup()
        ManageFillup()
    }
}
