ServerEvents.recipes(e =>{
    function id(item) {
        e.remove({id:item})
    }
    function output(item) {
        e.remove({output:item})
    }
     function input(item) {
        e.remove({input:item})
    }
    id('refinedstorage:quartz_enriched_iron')
    id('refinedstorage:quartz_enriched_copper')
    output('refinedstorage:silicon')
    output('refinedstorage:processor_binding')
    output('refinedstorage:raw_basic_processor')
    output('refinedstorage:raw_improved_processor')
    output('refinedstorage:raw_advanced_processor')
    id('refinedstorage:controller')
})