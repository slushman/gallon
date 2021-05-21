//
//  ServiceDetails.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct ServiceDetails: View {
    @Environment(\.presentationMode) var mode: Binding<PresentationMode>
    @State private var showManageService: Bool = false

    let entry: Entry

    var body: some View {
        VStack {
            Text("\(entry.formattedDate)")
                .padding()
                .font(.largeTitle)
            Text("\(entry.wOdometer) miles")
                .padding()
            Text("\(entry.wPrice)")
                .padding()
            Text("Services:")
                .padding()
//            ForEach(entry.services!, id:\.self) { service in
//                Text("\(service.rawValue)")
//                    .padding()
//                    .padding(.leading)
//            }
            Spacer()
        }
        .navigationTitle("Service Details")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden(true)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                HStack {
                    Image(systemName: "chevron.left")
                    Text("Back")
                }
                .foregroundColor(Color.green)
                .onTapGesture {
                    self.mode.wrappedValue.dismiss()
                }
            }
            
            ToolbarItem(placement: .navigationBarTrailing) {
                Text("Edit")
                    .foregroundColor(Color.green)
                    .onTapGesture {
                        self.showManageService = true
                    }
            }
        }
        .sheet(isPresented: $showManageService) {
            ManageService()
        }
    }
}

struct ServiceDetails_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let entry = Entry(context: moc)
        entry.date = Date(timeIntervalSinceNow: -86400)
        entry.odometer = 123456
        entry.price = 28.75
        entry.services = [ServiceType.OilChange, ServiceType.FilterOil]
        entry.type = EntryType.Service.rawValue

        return NavigationView {
            ServiceDetails(entry: entry)
        }
    }
}
