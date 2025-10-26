const fs = require('fs');

console.log('🔄 Updating remote PDF URLs to local paths...\n');

// Read the publications data
const publicationsData = JSON.parse(fs.readFileSync('src/data/publications_by_year.json', 'utf8'));

// Create a mapping of remote URLs to local paths
const remoteToLocalMap = {
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/12/heisele_etal-CVPR01b.pdf': '/papers/heisele_etal-CVPR01b.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/12/heisele_etal-CVPR01a.pdf': '/papers/heisele_etal-CVPR01a.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/ncomms1064.pdf': '/papers/ncomms1064.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/Chikkerur_Serre_Tan_Poggio_VisRsrchApril2010.pdf': '/papers/Chikkerur_Serre_Tan_Poggio_VisRsrchApril2010.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/Commun.-ACM-2010-Serre.pdf': '/papers/Commun.-ACM-2010-Serre.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/PNAS-2011-Zhang-8850-5.pdf': '/papers/PNAS-2011-Zhang-8850-5.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Kuehne_etal_ICCV2011.pdf': '/papers/Kuehne_etal_ICCV2011.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2016/01/Leussis_Ank3_BiolPsych2012.pdf': '/papers/Leussis_Ank3_BiolPsych2012.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/75760312.pdf': '/papers/75760312.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2018/03/serre2016.pdf': '/papers/serre2016.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2016/11/2016_Wilf_PNAS.pdf': '/papers/2016_Wilf_PNAS.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2016/11/2016_Cauchoix_NI.pdf': '/papers/2016_Cauchoix_NI.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2016/11/2016_Pascarella_JNM-1.pdf': '/papers/2016_Pascarella_JNM-1.pdf',
    'http://serre-lab.clps.brown.edu/wp-content/uploads/2019/12/Serre_092018.pdf': '/papers/Serre_092018.pdf'
};

let updatedCount = 0;

Object.keys(publicationsData).forEach(year => {
    publicationsData[year].forEach((publication, index) => {
        if (publication.pdfPath && publication.pdfPath.startsWith('http://serre-lab.clps.brown.edu')) {
            const newPath = remoteToLocalMap[publication.pdfPath];
            if (newPath) {
                console.log(`✅ ${publication.title.substring(0, 60)}`);
                console.log(`   ${publication.pdfPath.substring(0, 60)}... → ${newPath}`);
                publication.pdfPath = newPath;
                updatedCount++;
            }
        }
    });
});

console.log(`\n📊 Updated ${updatedCount} PDF paths from remote to local`);

// Write updated data back
fs.writeFileSync('src/data/publications_by_year.json', JSON.stringify(publicationsData, null, 2));

console.log('\n✅ Done! All PDFs now use local paths.');

