//
//  SelectServices.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

struct SelectServices: View {
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        NavigationView {
            VStack {
                List(ServiceType.allCases, id: \.self) { serviceType in
                    Text(serviceType.rawValue)
                }
            }
            .navigationTitle("Select Services")
            .toolbar {
                ToolbarItem(placement: .bottomBar) {
                    Text("Cancel")
                        .foregroundColor(Color.green)
                        .padding()
                        .onTapGesture {
                            self.presentationMode.wrappedValue.dismiss()
                        }
                }
                
                ToolbarItem(placement: .bottomBar) {
                    Text("Save")
                        .foregroundColor(Color.green)
                        .padding()
                        .onTapGesture {
                            // save service to user defaults or CoreData?
                            self.presentationMode.wrappedValue.dismiss()
                        }
                }
            }
        }
    }
}

struct SelectServices_Previews: PreviewProvider {
    static var previews: some View {
        SelectServices()
    }
}
