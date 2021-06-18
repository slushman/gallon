//
//  ProviderListBlankSlate.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/28/21.
//

import SwiftUI

struct ProviderListBlankSlate: View {
    var body: some View {
        VStack {
            Spacer()
            
            Text("Welcome to Gallon!")
                .font(.largeTitle)
            
            Spacer()

            Text("Tap the '+' in the top right corner")
            Text("to add a service provider for this vehicle.")
            
            Spacer()
        }
        .padding()
    }
}

struct ProviderListBlankSlate_Previews: PreviewProvider {
    static var previews: some View {
        ProviderListBlankSlate()
    }
}
