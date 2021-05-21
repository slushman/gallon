//
//  ActiveSheet.swift
//  Gallon
//
//  Created by Chris Wilcoxson on 5/17/21.
//

import Foundation

enum ActiveSheet: Identifiable {
    case manageVehicle, manageFillup, manageService
    
    var id: Int {
        hashValue
    }
}
