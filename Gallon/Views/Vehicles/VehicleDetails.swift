//
//  VehicleDetails.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct VehicleDetails: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var mode: Binding<PresentationMode>
    @State private var activeSheet: ActiveSheet?
    
    @FetchRequest(entity: Entry.entity(), sortDescriptors: [])
    var entries: FetchedResults<Entry>

    let vehicle: Vehicle
    
    var body: some View {
        VStack {
            VehicleImageHeader(vehicleName: vehicle.wName)
            
            List(entries, id: \.self) { entry in
                EntryRow(entry: entry)
            }

            Spacer()
        }
        .navigationTitle("Vehicle Details")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden(true)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                HStack {
                    Image(systemName: "chevron.left")
                    Text("Back")
                }
                .foregroundColor(Color.green)
                .onTapGesture {
                    self.mode.wrappedValue.dismiss()
                }
            }
            
            ToolbarItem(placement: .navigationBarTrailing) {
                Text("Edit")
                    .foregroundColor(Color.green)
                    .onTapGesture {
                        self.activeSheet = .manageVehicle
                    }
            }
        }
        .toolbar {
            ToolbarItem(placement: .bottomBar) {
                Text("Add Service")
                    .foregroundColor(Color.green)
                    .padding()
                    .onTapGesture {
                        self.activeSheet = .manageService
                    }
            }
            
            ToolbarItem(placement: .bottomBar) {
                Text("Add Fill-up")
                    .foregroundColor(Color.green)
                    .padding()
                    .onTapGesture {
                        self.activeSheet = .manageFillup
                    }
            }
        }
        .sheet(item: $activeSheet) { item in
            switch item {
            case .manageVehicle:
                ManageVehicle()
            case .manageFillup:
                ManageFillup()
            case .manageService:
                ManageService()
            }
        }
    }
}

struct VehicleDetails_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let vehicle = Vehicle(context: moc)
        vehicle.name = "Scooby"
        vehicle.make = "Toyota"
        vehicle.model = "Prius"
        vehicle.year = "2010"

        return NavigationView {
            VehicleDetails(vehicle: vehicle)
        }
    }
}
