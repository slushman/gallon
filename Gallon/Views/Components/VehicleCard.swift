//
//  VehicleCard.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct VehicleCard: View {
    var vehicle: Vehicle

    var body: some View {
            ZStack {
                RoundedRectangle(cornerRadius: 15, style: .continuous)
                    .fill(Color.green)
                    .frame(height: 250)
                VStack {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("\(vehicle.wOdometer) miles")
                                .textCase(/*@START_MENU_TOKEN@*/.uppercase/*@END_MENU_TOKEN@*/)
                                  .foregroundColor(.white)
                            Text("\(vehicle.wYear) \(vehicle.wModel)")
                                .font(.largeTitle)
                                .foregroundColor(.white)
                        }

                        Spacer()

                        VStack {
                            Button(action: {
                                print("vehicle ellipses was pressed")
                            }) {
                                Image(systemName: "ellipsis.circle")
                                    .foregroundColor(Color.white)
                            }
                        }
                    }
                    .padding(.vertical)

                    Spacer()

                    HStack {
                        Text("28.3 mpg")
                            .foregroundColor(.white)

                        Spacer()
                    }
                    .padding(.vertical)
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
            VehicleCard(vehicle: vehicle)
        }
    }
}
