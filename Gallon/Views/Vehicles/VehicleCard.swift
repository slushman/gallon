//
//  VehicleCard.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct VehicleCard: View {
    @Binding var activeSheet: ActiveSheet?
    //@Binding var selectedVehicle: Vehicle?

    var vehicle: Vehicle
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 15, style: .continuous)
                .fill(Color.green)
                .frame(height: 250)
            VStack {
                NavigationLink(destination: VehicleDetails(vehicle: vehicle)) {
                    VStack {
                        HStack {
                            VStack(alignment: .leading) {
                                Text("\(vehicle.wName)")
                                    .font(.largeTitle)
                                    .foregroundColor(.white)
                                Text("\(vehicle.wYear) \(vehicle.wModel)")
                                    .foregroundColor(.white)
                            }

                            Spacer()
                        }
                        .padding(.vertical)

                        Spacer()

                        HStack {
                            Text("28.3 mpg")
                                .foregroundColor(.white)

                            Spacer()
                            
                            Text("\(vehicle.wOdometer) miles")
                                .textCase(/*@START_MENU_TOKEN@*/.uppercase/*@END_MENU_TOKEN@*/)
                                  .foregroundColor(.white)
                        }
                        .padding(.vertical)
                    }
                }
                    .accessibilityLabel("View \(vehicle.wName) Details")

                //Spacer()

//                VStack {
//                    Divider()
//
//                    HStack {
//                        Button("Add Service") {
//                            print("trigger")
//                            print("\(vehicle.wName)")
//                            activeSheet = .manageService
//                            selectedVehicle = vehicle
//                        }
//                        .frame(minWidth: 0, maxWidth: .infinity)
//
//                        Button("Add Fill-up") {
//                            print("trigger")
//                            activeSheet = .manageFillup
//                            selectedVehicle = vehicle
//                        }
//                        .frame(minWidth: 0, maxWidth: .infinity)
//                    }
//                    .padding(.horizontal)
//                    .foregroundColor(.white)
//                }
            }
            .padding()
            .frame(height: 250)
        }
    }
}

struct VehicleCard_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let vehicle = Vehicle(context: moc)
        vehicle.name = "Scooby"
        vehicle.make = "Toyota"
        vehicle.model = "Prius"
        vehicle.year = "2010"

        return NavigationView {
//            VehicleCard(activeSheet: .constant(ActiveSheet.manageVehicle), selectedVehicle: .constant(vehicle), vehicle: vehicle)
            VehicleCard(activeSheet: .constant(ActiveSheet.manageVehicle), vehicle: vehicle)
        }
    }
}
