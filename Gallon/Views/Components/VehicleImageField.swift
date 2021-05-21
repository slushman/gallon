//
//  VehicleImageField.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct VehicleImageField: View {
    @State private var image: Image?
    @State private var inputImage: UIImage?
    @State private var showingImagePicker = false
    
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
                    .overlay(TintedOverlay(text: vehicleName))
                    .frame(height: 250)
            } else {
                Text("Tap to select a picture")
                    .foregroundColor(.white)
                    .font(.headline)
            }
        }
        .frame(height: 250)
        .onTapGesture {
            self.showingImagePicker = true
        }
        .sheet(isPresented: $showingImagePicker, onDismiss: loadImage) {
            ImagePicker(image: self.$inputImage)
        }
    }
}

struct VehicleImageField_Previews: PreviewProvider {
    static var previews: some View {
        VehicleImageField(vehicleName: "Scooby")
    }
}
