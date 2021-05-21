//
//  CustomAlert.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct CustomAlert: View {
    let mpg: Float

    var body: some View {
        VStack {
            Spacer()
            Text("Fill-up Saved!")
            Spacer()
            Text("\(mpg, specifier: "%.1f") MPG")
                .font(.title)
            Spacer()
            Divider()
            VStack {
                Button("Dismiss") {
                    
                }
            }
        }
        .padding()
        .frame(width: UIScreen.main.bounds.width - 50, height: 200)
        .background(Color.blue)
        .cornerRadius(12)
        .clipped()
    }
}

struct CustomAlert_Previews: PreviewProvider {
    static var previews: some View {
        CustomAlert(mpg: 28.2)
    }
}

