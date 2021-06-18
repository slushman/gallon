//
//  OverrideListBlankSlate.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 6/8/21.
//

import SwiftUI

struct OverrideListBlankSlate: View {
    var body: some View {
        VStack {
            Spacer()
            
            Text("Welcome to Gallon!")
                .font(.largeTitle)
            
            Spacer()
            
            Text("Tap the '+' in the top right corner")
            Text("to add a mileage override for this vehicle.")
            
            Spacer()
        }
        .padding()
    }
}

struct OverrideListBlankSlate_Previews: PreviewProvider {
    static var previews: some View {
        OverrideListBlankSlate()
    }
}
