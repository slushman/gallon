//
//  VehicleListBlankSlate.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/21/21.
//

import SwiftUI

struct VehicleListBlankSlate: View {
    var body: some View {
        VStack {
            Spacer()
            
            Text("Welcome to Gallon!")
                .font(.largeTitle)
            
            Spacer()

            Text("Tap the '+' in the top right corner")
            Text("to add a vehicle.")
            
            Spacer()
        }
        .padding()
    }
}

struct VehicleListBlankSlate_Previews: PreviewProvider {
    static var previews: some View {
        VehicleListBlankSlate()
    }
}
