//
//  VehicleNameDisplayField.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 6/9/21.
//

import SwiftUI

struct VehicleNameDisplayField: View {
    let vehicleName: String
    
    init(_ vehicleName: String) {
        self.vehicleName = vehicleName
    }

    var body: some View {
        HStack {
            Text("Vehicle:")
            Spacer()
            Text("\(vehicleName)")
        }
    }
}

struct VehicleNameDisplayField_Previews: PreviewProvider {
    static var previews: some View {
        VehicleNameDisplayField("Yer Mom")
    }
}
