//
//  FillupDetails.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI
import CoreData

struct FillupDetails: View {
    @Environment(\.presentationMode) var mode: Binding<PresentationMode>
    @State private var showManageFillup = false

    let entry: Entry

    var body: some View {
        VStack {
            Text("MPG here")
                .padding()
                .font(.largeTitle)
            Text("\(entry.formattedDate)")
                .padding()
            Text("\(entry.wOdometer) miles")
                .padding()
            Text("\(entry.wPrice)")
                .padding()
            Text("\(entry.wGallons)")
                .padding()
            Spacer()
        }
        .navigationTitle("Fill-up Details")
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
                            self.showManageFillup = true
                        }
            }
        }
        .sheet(isPresented: $showManageFillup) {
            ManageFillup(
                vehicle: entry.vehicle!,
                fillupEntryToEdit: entry,
                entryDate: entry.wDate,
                odometer: entry.odometer,
                price: entry.price,
                gallons: entry.gallons
            )
        }
    }
}

struct FillupDetails_Previews: PreviewProvider {
    static let moc = NSManagedObjectContext(concurrencyType: .mainQueueConcurrencyType)

    static var previews: some View {
        let entry = Entry(context: moc)
        entry.date = Date(timeIntervalSinceNow: -(86400 * 2))
        entry.gallons = 18
        entry.odometer = 123456
        entry.price = 28.75
        entry.type = EntryType.Fillup.rawValue
        
        return NavigationView {
            FillupDetails(entry: entry)
        }
    }
}
