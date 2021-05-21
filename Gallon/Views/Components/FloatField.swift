//
//  FloatField.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct FloatField: View {
    let label: String
    
    @Binding var value: Float

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

struct FloatField_Previews: PreviewProvider {
    static var previews: some View {
        FloatField(label: "Float Field", value: .constant(2000))
    }
}
