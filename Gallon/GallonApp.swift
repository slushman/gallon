//
//  GallonApp.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import SwiftUI

@main
struct GallonApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
