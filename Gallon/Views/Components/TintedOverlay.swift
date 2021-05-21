//
//  TintedOverlay.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct TintedOverlay: View {
    let text: String

    var body: some View {
        VStack {
            Spacer()
            Text("\(text)")
                .foregroundColor(.white)
            Spacer()
            HStack {
                Spacer()
                Image(systemName: "camera")
                    .foregroundColor(.white)
                    .padding()
            }
        }
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.black)
        .opacity(0.75)
        .edgesIgnoringSafeArea(.all)
    }
}

struct TintedOverlay_Previews: PreviewProvider {
    static var previews: some View {
        TintedOverlay(text: "Scooby")
    }
}
