//
//  NumberField.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct NumberField: View {
    let label: String
    
    @Binding var value: Float
    
    init(_ label: String, value: Binding<Float>) {
        self.label = label
        self._value = value
    }

    let formatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter
    }()
    
    var body: some View {
        HStack {
            Text(label)
            Spacer()
            TextField(label, value: self.$value, formatter: formatter)
                .multilineTextAlignment(.trailing)
                .keyboardType(.numberPad)
                .fixedSize()

        }
    }
}

struct NumberField_Previews: PreviewProvider {
    static var previews: some View {
        NumberField("Number Field", value: .constant(2000))
    }
}
