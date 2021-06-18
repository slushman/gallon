//
//  RowButton.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/28/21.
//

import SwiftUI

struct RowButton: View {
    let rowLabel: String

    var body: some View {
        VStack {
            HStack {
                Text(rowLabel)
                    .foregroundColor(Color.green)
                Spacer()
                Image(systemName: "chevron.forward")
                    .foregroundColor(Color.gray)
            }
            .frame(minWidth: 0, maxWidth: .infinity)
            .padding()
            
            Divider()
        }
    }
}

struct RowButton_Previews: PreviewProvider {
    static var previews: some View {
        RowButton(rowLabel: "Service Providers")
    }
}
