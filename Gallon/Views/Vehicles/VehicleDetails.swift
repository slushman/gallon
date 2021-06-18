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

    @FetchRequest(entity: Entry.entity(), sortDescriptors: [])
    var entries: FetchedResults<Entry>

    @State private var activeSheet: ActiveSheet?
    @State private var selectedColorIndex = 0
    
    let vehicle: Vehicle
    
    var body: some View {
        VStack {
            VehicleImageHeader(vehicleName: vehicle.wName)
            
            if entries.count > 0 {
                List(entries, id: \.self) { entry in
                    EntryRow(entry: entry)
                }
            } else {
                VehicleDetailsBlankSlate()
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
            
            ToolbarItem(placement: .primaryAction) {
                Menu {
                    Button("Delete \(vehicle.wName)") {
                        // delete vehicle from CoreData
                    }
                    Button("Edit \(vehicle.wName)") {
                        self.activeSheet = .manageVehicle
                    }
                    Button("Add Service") {
                        self.activeSheet = .manageService
                    }
                    Button("Add Fill-up") {
                        self.activeSheet = .manageFillup
                    }
                }
                label: {
                    Label("Edit", systemImage: "ellipsis.circle")
                        .foregroundColor(Color.green)
                }
            }
        }
        .sheet(item: $activeSheet) { item in
            switch item {
            case .manageFillup:
                ManageFillup(vehicle: vehicle)
            case .manageService:
                ManageService(vehicle: vehicle)
            default:
                ManageVehicle(
                    vehicleToEdit: vehicle,
                    name: vehicle.wName,
                    make: vehicle.wMake,
                    model: vehicle.wModel,
                    year: vehicle.wYear,
                    odometer: vehicle.odometer,
                    vin: vehicle.wVin,
                    licensePlateState: vehicle.wLicensePlateState,
                    licensePlateNumber: vehicle.wLicensePlateNumber,
                    color: vehicle.wColor,
                    engineSize: vehicle.wEngineSize,
                    purchaseDate: vehicle.wPurchaseDate
                )
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
