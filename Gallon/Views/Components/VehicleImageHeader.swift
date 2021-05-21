//
//  VehicleImageHeader.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct VehicleImageHeader: View {
    @State private var image: Image?
    @State private var inputImage: UIImage?
    
    let vehicleName: String
    
    func loadImage() {
        guard let inputImage = inputImage else { return }
        image = Image(uiImage: inputImage)
        
    }

    var body: some View {
        ZStack {
            Rectangle()
                .fill(Color.secondary)
            
            if image != nil {
                image?
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .edgesIgnoringSafeArea(.all)
                    .overlay(TintedOverlay(text: vehicleName))
                    .frame(height: 200)
            }
        }
        .edgesIgnoringSafeArea(.all)
        .frame(height: 200)
    }
}

struct VehicleImageHeader_Previews: PreviewProvider {
    static var previews: some View {
        VehicleImageHeader(vehicleName: "Scooby")
    }
}
