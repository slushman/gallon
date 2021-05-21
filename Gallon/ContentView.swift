//
//  ContentView.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct ContentView: View {
    @Environment(\.managedObjectContext) private var viewContext
    @Environment(\.presentationMode) var presentationMode

    @FetchRequest(entity: Vehicle.entity(), sortDescriptors: [])
    var vehicles: FetchedResults<Vehicle>
    
    @State private var showingManageVehicle: Bool = false

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    ForEach(vehicles) { vehicle in
                        NavigationLink(destination: VehicleDetails(vehicle: vehicle)) {
                            VehicleCard(vehicle: vehicle)
                        }
                    }
                }
            }
            .padding()
            .navigationTitle("Choose Vehicle")
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Image(systemName: "gear")
                        .imageScale(.large)
                        .foregroundColor(Color.green)
                        .onTapGesture {
                            
                        }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Image(systemName: "plus")
                        .imageScale(.large)
                        .foregroundColor(Color.green)
                        .onTapGesture {
                            self.showingManageVehicle = true
                        }
                }
            }
            .sheet(isPresented: $showingManageVehicle) {
                ManageVehicle()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environment(\.managedObjectContext, PersistenceController.preview.container.viewContext)
    }
}
