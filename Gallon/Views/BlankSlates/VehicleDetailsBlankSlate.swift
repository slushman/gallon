//
//  VehicleDetailsBlankSlate.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/28/21.
//

import SwiftUI

struct VehicleDetailsBlankSlate: View {
    var body: some View {
        VStack {
            Spacer()
            
            Text("Welcome to Gallon!")
                .font(.largeTitle)
            
            Spacer()

            Text("Tap the ellipsis to edit this vehicle")
            Text("or add a service or fill-up entry.")
            
            Spacer()
        }
        .padding()
    }
}

struct VehicleDetailsBlankSlate_Previews: PreviewProvider {
    static var previews: some View {
        VehicleDetailsBlankSlate()
    }
}
