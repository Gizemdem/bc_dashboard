import create from 'zustand';
import {persist} from 'zustand/middleware';

export const useStore = create(
    persist((set) => ({
        // Contains the 
        elements: [],
        costs: [],
        addElement: (newElement) => {
            
            set((prev) => (
                {
                elements: [
                    ... prev.elements,
                    newElement
                ]
            }))
        },

        deleteElement: (id) => {
            set((prev) => ({
                elements: prev.elements.filter((elem) => elem['GlobalId'] !== id),
            }))
        },

        updateElement: (element) => {
            set((prev) => ({
                elements: prev.elements.map((elem) => 
                    elem['GlobalId'] === element['GlobalId']
                    ? ({...element}) : elem
                )
            }))
        },
        updateSubset: (modelId, subsetId) => {
            set((prev) => ({
                elements: prev.elements.map((elem) => 
                elem['ModelId'] === modelId
                ? ({...elem, subsetId: subsetId}) : elem
            )}))
        },
        addCost: (globalId, cost) => {
            set((prev) => ({
                costs: [...prev.costs, { GlobalId: globalId, cost: cost }]
            }))
        },
        updateCost: (globalId, newCost) => {
            set((prev) => ({
                costs: prev.costs.map((elem) => 
                elem.GlobalId === globalId ? ({GlobalId: globalId, cost: newCost}) : elem)
            }))
        },
        deleteCost: (globalId) => {
            set((prev) => ({
                costs: prev.costs.filter((elem) => elem.GlobalId !== globalId)
            }))
        }

    }),
        // second argument for persist()
        {name: 'element-storage'})
)