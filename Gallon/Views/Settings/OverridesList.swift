//
//  OverridesList.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/28/21.
//

import SwiftUI

struct OverridesList: View {
    @Environment(\.managedObjectContext) var moc
    
    @FetchRequest(entity: Override.entity(), sortDescriptors: [])
    var overrides: FetchedResults<Override>
    
    init() {
        UINavigationBar.appearance().tintColor = UIColor(red: 0.20, green: 0.78, blue: 0.35, alpha: 1.00)
    }

    var body: some View {
        VStack {
            if overrides.count > 0 {
                List(overrides, id: \.self) { override in
                    OverrideRow(override: override)
                }
            } else {
                OverrideListBlankSlate()
            }

            Spacer()
        }
        .navigationTitle("Mileage Overrides")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: ManageOverride()) {
                    Text("Add New")
                }
           }
        }
    }
}

struct OverridesList_Previews: PreviewProvider {
    static var previews: some View {
        OverridesList()
    }
}
