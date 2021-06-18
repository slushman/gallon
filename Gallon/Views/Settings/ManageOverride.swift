//
//  ManageOverride.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/28/21.
//

import SwiftUI
import CoreData

struct ManageOverride: View {
    @Environment(\.managedObjectContext) var moc
    @Environment(\.presentationMode) var presentationMode
    
    var overrideToEdit: Override?

    @State var miles: Float = 0.00
    @State var service = ""
    @State var vehicle = ""
    
    var title: String {
        overrideToEdit == nil ? "Add Override" : "Edit Override"
    }
    
    var body: some View {
        VStack {
            VStack {
                Form {
                    Section(header: Text("Override Details")) {
                        TextField("Service", text: $service)

                        NumberField("Miles", value: $miles)
                    }
                }
            }
        }
        .navigationTitle(title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: OverridesList()) {
                    Text("Save")
                        .foregroundColor(Color.green)
                        .padding()
                        .onTapGesture {
                            self.onSaveTapped()
                        }
                }
            }
        }
    }
    
    private func onSaveTapped() {
        let override: Override

        if let overrideToEdit = self.overrideToEdit {
            override = overrideToEdit
        } else {
            override = Override(context: self.moc)
            override.id = UUID()
        }

        override.miles = self.miles
        override.vehicle = self.vehicle
        override.service = self.service
        
        try? self.moc.save()
        
        self.presentationMode.wrappedValue.dismiss()
    }
}

struct ManageOverride_Previews: PreviewProvider {
    static var previews: some View {
        ManageOverride()
    }
}
