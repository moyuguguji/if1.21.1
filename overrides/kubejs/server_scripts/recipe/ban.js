ServerEvents.recipes(event =>{
    event.remove([
        {id:'refinedstorage:quartz_enriched_iron'},
        {id:'refinedstorage:quartz_enriched_copper'},
        {input:'refinedstorage:controller'},
        {output:'refinedstorage:silicon'},
        {output:'refinedstorage:processor_binding'},
        {output:'refinedstorage:raw_basic_processor'},
        {output:'refinedstorage:raw_improved_processor'},
        {output:'refinedstorage:raw_advanced_processor'}
    ])
})